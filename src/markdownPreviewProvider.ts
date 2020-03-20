import { Disposable, WebviewPanel, window, ViewColumn, commands, Uri, extensions, Extension, Webview } from "vscode";
import * as fse from 'fs-extra';
import * as path from 'path';

class MarkdownPreviewProvider implements Disposable {
    private panel: WebviewPanel | undefined;
    private disposables: Disposable[] = [];
    private markdownExtension: Extension<any> | undefined;

    constructor() {
        this.markdownExtension = extensions.getExtension('vscode.markdown-language-features');
    }

    public async show(markdownFilePath: string, title: string): Promise<void> {
        if (!this.panel) {
            this.panel = window.createWebviewPanel('java.markdownPreview', title, ViewColumn.Active, {
                localResourceRoots: this.markdownExtension ? [Uri.file(path.join(this.markdownExtension.extensionPath, 'media'))] : undefined,
                retainContextWhenHidden: true,
                enableFindWidget: true,
            });
        }

        this.disposables.push(this.panel.onDidDispose(() => {
            this.panel = undefined;
        }));

        this.panel.webview.html = await this.getHtmlContent(this.panel.webview, markdownFilePath);

        this.panel.reveal(this.panel.viewColumn);
    }

    public dispose(): void {
        if (this.panel) {
            this.panel.dispose();
        }
        for (const disposable of this.disposables) {
            disposable.dispose();
        }
    }

    protected async getHtmlContent(webview: Webview, markdownFilePath: string): Promise<string> {
        const nonce: string = this.getNonce();
        const styles: string = this.getStyles(webview, nonce);
        const markdownString: string = await fse.readFile(markdownFilePath, 'utf8');
        const body: string = await commands.executeCommand('markdown.api.render', markdownString);
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'nonce-${nonce}';"/>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                ${styles}
            </head>
            <body class="vscode-body 'scrollBeyondLastLine' 'wordWrap' 'showEditorSelection'" style="tab-size:4">
                ${body}
            </body>
            </html>
        `;
    }

    protected getStyles(webview: Webview, nonce: string): string {
        if (!this.markdownExtension) {
            return '';
        }
        let styles: Uri[] = [];
        try {
            const stylePaths: string[] = this.markdownExtension.packageJSON["contributes"]["markdown.previewStyles"];
            styles = stylePaths.map((p: string) => webview.asWebviewUri(Uri.file(path.join(this.markdownExtension.extensionPath, p))));
        } catch (error) {
            return '';
        }
        return styles.map((style: Uri) => `<link rel="stylesheet" type="text/css" nonce="${nonce}" href="${style.toString()}">`).join('\n');
    }

    private getNonce(): string {
        let text = "";
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

export const markdownPreviewProvider: MarkdownPreviewProvider = new MarkdownPreviewProvider();
