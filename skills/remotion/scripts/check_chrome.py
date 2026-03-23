import os
from pathlib import Path

# 自动获取用户主目录下的 .remotion 路径
home_dir = Path.home()
chrome_path = home_dir / ".remotion" / "chrome-headless-shell" / "mac-arm64" / "chrome-headless-shell-mac-arm64" / "chrome-headless-shell"

# 判断文件是否存在 + 可执行
if chrome_path.is_file() and os.access(chrome_path, os.X_OK):
    print(f"✅ Chrome 存在：{chrome_path}")
else:
    print(f"❌ Chrome 不存在：{chrome_path}")