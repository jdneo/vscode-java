## Table of Content
- [Introduction](#introduction)
- [Assign to variable](#assign-to-variable)
- [Change modifiers to final](#change-modifiers-to-final)
- [Convert anonymous to nested class](#convert-anonymous-to-nested-class)
- [Convert to anonymous class creation](#convert-to-anonymous-class-creation)
- [Convert to enhanced for loop](#convert-to-enhanced-for-loop)
- [Convert to lambda expression](#convert-to-lambda-expression)
- [Convert to static import](#convert-to-static-import)
- Extract refactorings
  - [Extract to constant](#extract-to-constant)
  - [Extract to field](#extract-to-field)
  - [Extract to method](#extract-to-method)
  - [Extract to local variable](#extract-to-local-variable)
- Inline refactorings
  - [Inline constant](#inline-constant)
  - [Inline local variable](#inline-local-variable)
  - [Inline method](#inline-method)
- Invert boolean
  - [Invert conditions](#invert-conditions)
  - [Invert local variable](#invert-local-variable)
- [Move](#move)
- [Rename](#rename)
- Type change
  - [Change resolved type to var type](#change-resolved-type-to-var-type)
  - [Change var type to resolved type](#change-var-type-to-resolved-type)

---

## Introduction
### Invoke refactoring
...

---

## Assign to variable

---

## Change modifiers to final

---

## Convert anonymous to nested class

---

## Convert to anonymous class creation

---

## Convert to enhanced for loop

---

## Convert to lambda expression

---

## Convert to static import

---

## Extract to constant

---

## Extract to field

---

## Extract to method

---

## Extract to local variable

---

## Inline constant

---

## Inline local variable

---

## Inline method

---

## Invert conditions

---

## Invert local variable

---

## Move

---

## Rename

**_Default shortcut:_ <kbd>F2</kbd>**

Renames the selected element and corrects all references to the elements (also in other files).

### Examples
Let's rename the class `Foo` to `Bar`
#### Before

```java
public class Foo {
    // ...
}

public void myMethod() {
    Foo myClass = new Foo();
}
```
#### After
```java
public class Bar {
    // ...
}

public void myMethod() {
    Bar myClass = new Bar();
}
```

---

## Change resolved type to var type

---

## Change var type to resolved type