Remove-Item -Recurse .\app\.git\ -Force
$CloneUrl = $(terraform output clone_url_http_consumer)
cd .\app 
git init 
git remote add origin $CloneUrl
git add .
git commit -m "commit inicial" 
git push --set-upstream origin master
pause
 