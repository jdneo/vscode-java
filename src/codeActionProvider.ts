import { CodeActionProvider, CodeActionProviderMetadata, CodeAction, CodeActionKind } from "vscode";
import { Commands } from "./commands";

export class RefactorDocumentProvider implements CodeActionProvider {
    provideCodeActions() {
        return [];
    }

    public static readonly metadata: CodeActionProviderMetadata = {
        providedCodeActionKinds: [ 
            CodeActionKind.Refactor,
        ],
        documentation: [
            {
                kind: CodeActionKind.Refactor,
                command: {
                    command: Commands.LEARN_MORE_ABOUT_REFACTORING,
                    title: 'Learn more about Java refactorings.'
                }
            },
        ]
    }
}