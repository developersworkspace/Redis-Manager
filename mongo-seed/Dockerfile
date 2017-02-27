FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongo --db redis_manager_prod --collection nodes --type json --file /init.json --jsonArray