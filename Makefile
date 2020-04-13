setup:
	lerna bootstrap
run:
	yarn workspace @starcraft-ui/core tsc:watch &\
	yarn workspace @starcraft-ui/demo start
