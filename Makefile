run:
	cdk synth
	sam local start-api -t cdk.out/main-UserProfile.template.json --env-vars environment.json
test-start-local: 
	cdk synth --quiet
	docker-compose up -d
	sleep 10
	node scripts/index.js
	npm run test-sf
	make test-end-local
test-end-local: 
	docker-compose down

build-run-handler:
	cdk synth
	make run-handler
run-handler:
	sam local invoke UserUpdaterFunction -t cdk.out/main-UserProfile.template.json --event src/user-dynamodb-updater/test-events/one.json --env-vars environment.json --profile=dev

