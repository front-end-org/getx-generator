# GetX Generator

A Visual Studio Code extension that generates Dart module structures with views, bindings, and controllers for GetX architecture.

## Features

- Right-click on a folder in the Explorer view
- Select "GetX: Generate Module" from the context menu
- Enter a module name
- The extension will generate a complete module structure with:
  - Main module folder
  - Views, bindings, and controllers subfolders
  - Pre-configured Dart files with GetX pattern

## Demo

![demo](demo.gif)

## VS Code API

### `vscode` module

- [`commands.registerCommand`](https://code.visualstudio.com/api/references/vscode-api#commands.registerCommand)
- [`window.showInformationMessage`](https://code.visualstudio.com/api/references/vscode-api#window.showInformationMessage)
- [`window.showErrorMessage`](https://code.visualstudio.com/api/references/vscode-api#window.showErrorMessage)
- [`window.showInputBox`](https://code.visualstudio.com/api/references/vscode-api#window.showInputBox)

### Contribution Points

- [`contributes.commands`](https://code.visualstudio.com/api/references/contribution-points#contributes.commands)
- [`contributes.menus`](https://code.visualstudio.com/api/references/contribution-points#contributes.menus)

## Running the Extension

- Run `npm install` in terminal to install dependencies
- Run `npm run compile` to compile the TypeScript code
- Run the `Run Extension` target in the Debug View. This will:
  - Start a task `npm: watch` to compile the code in watch mode
  - Run the extension in a new VS Code window

## Usage

1. Open a Flutter project in VS Code
2. In the Explorer view, navigate to the folder where you want to create a new module
3. Right-click on the folder and select "GetX: Generate Module"
4. Enter a module name (only lowercase letters, numbers, and underscores allowed)
5. The extension will generate the module structure with appropriate files and folders

# 打包成 .vsix
```
# 全局安装vsce
npm install -g @vscode/vsce

# 在扩展项目根目录执行，生成 .vsix 文件
vsce package
```
