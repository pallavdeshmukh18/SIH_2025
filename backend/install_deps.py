import json
import subprocess
import sys

with open("dependencies.json") as f:
    data = json.load(f)

for pkg, ver in data["dependencies"].items():
    subprocess.check_call(
        [sys.executable, "-m", "pip", "install", f"{pkg}=={ver}"])
