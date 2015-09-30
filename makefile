gulp-build:
	ENV=staging gulp build
	gulp build

deploy:
	make gulp-build
	ionic build android
	ionic build ios
	ionic upload

deploy-ios:
	make gulp-build
	ionic build ios
	ionic upload

deploy-android:
	make gulp-build
	gulp build
	ionic build android
	ionic upload
