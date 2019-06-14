ng build --prod --output-path docs --base-href "https://justdaile.github.io/TrashyMetronome/"
git add /docs
git status
git commit -m production build
git push origin master
