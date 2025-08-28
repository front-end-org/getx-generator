export const subFolders = ['views', 'bindings', 'controllers'];
export const dartFiles = ['view', 'binding', 'controller'];

// 工具函数：将下划线命名转为帕斯卡命名（首字母大写的驼峰命名）
export function toPascalCase(str: string): string {
    return str.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

/// 生成 _controller.dart 代码
export function get_controller(file_name: string): string {
    var className = `${toPascalCase(file_name)}`;
    return `import 'package:get/get.dart';

class ${className}Controller extends GetxController {}`;
}

/// 生成 _binding.dart 代码
export function get_binding(file_name: string): string {
    var className = `${toPascalCase(file_name)}`;
    return `import 'package:get/get.dart';
import '../controllers/${file_name}_controller.dart';

class ${className}Binding implements Bindings {
  @override
  void dependencies() {
     Get.lazyPut<${toPascalCase(className)}Controller>(() => ${toPascalCase(className)}Controller());
  }
}`;
}

/// 生成 _view.dart 代码
export function get_view(file_name: string): string {
  const className = `${toPascalCase(file_name)}`;
  return `import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/${file_name}_controller.dart';

class ${className}View extends GetView<${className}Controller> {
  const ${className}View({super.key});

  @override
  Widget build(BuildContext context) {
    return GetX<NavBarController>(
      builder: (controller) {
        return Container();
      },
    );
  }
}`;
}
