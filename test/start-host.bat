@echo off
pushd ..\src
"C:\Program Files (x86)\IIS Express\iisexpress.exe" /path:%cd% /port:9090 /systray:true
popd