api-db_migrate:
	docker-compose exec -T api npm run typeorm migration:run

api-db_seed:
	docker-compose exec -T api npm run seed:run