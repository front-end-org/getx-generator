import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as tools from './tools';

export function activate(context: vscode.ExtensionContext) {
  // 注册命令
  const disposable = vscode.commands.registerCommand(
    'getx-generator.generateModule',
    async (uri: vscode.Uri) => {
      // 检查是否右键点击了文件夹
      if (!uri || uri.scheme !== 'file') {
        vscode.window.showErrorMessage('请在资源管理器中选择一个文件夹');
        return;
      }

      // 验证选择的路径是否为文件夹
      try {
        const stats = fs.statSync(uri.fsPath);
        if (!stats.isDirectory()) {
          vscode.window.showErrorMessage('请选择一个文件夹，而不是文件');
          return;
        }
      } catch (_err) {
        vscode.window.showErrorMessage('访问选中的路径时出错');
        return;
      }

      // 显示输入框获取module名称
      const moduleName = await vscode.window.showInputBox({
        prompt: '请输入模块名称',
        placeHolder: '例如: user, product, settings',
        validateInput: (value) => {
          if (!value) {
            return '模块名称不能为空';
          }
          if (!/^[a-z0-9_]+$/.test(value)) {
            return '模块名称只能包含小写字母、数字和下划线';
          }
          return null;
        }
      });

      if (!moduleName) {
        return; // 用户取消输入
      }

      try {
        const folderPath = path.join(uri.fsPath, moduleName);

        // 创建主文件夹
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }

        // 创建子文件夹: views, bindings, controllers
        const subFolders = tools.subFolders;
        const dartFiles = tools.dartFiles;
        for (let i = 0; i < subFolders.length; i++) {
          const subFolder = subFolders[i];
          const subFolderPath = path.join(folderPath, subFolder);
          if (!fs.existsSync(subFolderPath)) {
            fs.mkdirSync(subFolderPath, { recursive: true });
          }

          // 创建Dart文件
          const fileName = `${moduleName}_${dartFiles[i]}.dart`;
          const filePath = path.join(subFolderPath, fileName);

          if (!fs.existsSync(filePath)) {
            // 根据不同的子文件夹写入不同的内容
            let fileContent = '';
            if (subFolder === 'bindings') {
              fileContent = tools.get_binding(moduleName);
            } else if (subFolder === 'controllers') {
              fileContent = tools.get_controller(moduleName);
            } else if (subFolder === 'views') {
              fileContent = tools.get_view(moduleName);
            } else {
              fileContent = `// ${fileName}\n\n`;
            }
            fs.writeFileSync(filePath, fileContent, 'utf8');
          }
        }

        vscode.window.showInformationMessage(`成功生成 ${moduleName} 模块结构`);
      } catch (_err) {
        vscode.window.showErrorMessage(`生成模块时出错: ${_err instanceof Error ? _err.message : String(_err)}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// 当扩展被禁用时调用
export function deactivate() { }
