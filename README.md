# orfleton

```
sudo -u postgres -i
psql

CREATE ROLE readonly WITH LOGIN PASSWORD 'raggroup123!';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;

CREATE DATABASE gene_catalog;

\list -- lists databases
\connect -- connect to specific database
\dt -- list tables in current database

CREATE TABLE genes (
    id INTEGER PRIMARY KEY,
    gene_id TEXT,
    annotation TEXT,
    ecid TEXT,
    gene_name TEXT,
    body_site TEXT,
    num_genes INTEGER,
    gene_length INTEGER,
    study_id TEXT,
    consensus_sequence TEXT
);

COPY genes FROM '/mnt/mounted/oral/synthetic_database_table_v3.tsv';
```

## azure land
postgres connections -- https://docs.microsoft.com/en-us/azure/app-service/containers/tutorial-python-postgresql-app

```
psql -h orfletons.postgres.database.azure.com -U eleanor@orfletons postgres

CREATE ROLE readonly WITH LOGIN PASSWORD 'raggroup123!';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;

CREATE DATABASE genes;
\connect genes

CREATE TABLE genes (
    id INTEGER PRIMARY KEY,
    gene_id TEXT,
    annotation TEXT,
    ecid TEXT,
    gene_name TEXT,
    ncbi_taxon_id TEXT,
    num_genes NUMERIC,
    body_site TEXT,
    gene_length NUMERIC,
    consensus_sequence TEXT
);

\COPY genes FROM '/mnt/mounted/oral/db_testing/gene_database_oral_gut_full.csv'; 

pv gene_database_oral_gut_full.csv | psql -h orfletons.postgres.database.azure.com -U eleanor@orfletons -d genes -c "COPY genes FROM STDIN CSV HEADER;"

CREATE INDEX index_gene_name ON genes(gene_name);
CREATE INDEX index_ecid ON genes(ecid);

psql -h orfletons.postgres.database.azure.com -U eleanor@orfletons -d genes -f genes_comma

genes_comma:
UPDATE genes SET body_site='oral | gut' WHERE gene_id in ('CCFPLHNO_53079', ...);

exporting DB:
pg_dump -h orfletons.postgres.database.azure.com -U eleanor@orfletons genes > dbexport.pgsql

watching export:
watch -n 30 "ls -lh dbexport.pgsql | awk '{print \$5}'"
```

## components
* flask
    * home
        * overview
        * graphs/charts
    * search tool
        * list of column choices
        * choice to add more filters by column
        * and/or/not options
        * exact match vs. similar
        * query-ing endpoint
        * CSV-download tool
    * data & tools
        * detailed data description
        * references
* dao
    * model with each column
    * generate query with search filters
    * return csv-able data
