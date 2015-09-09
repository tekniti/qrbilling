deploy:
	ENV=staging gulp build
	ionic build android
	ionic build ios
	ionic upload

deploy-ios:
	ENV=staging gulp build
	ionic build ios
	ionic upload

deploy-android:
	ENV=staging gulp build
	ionic build android
	ionic upload
