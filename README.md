## REST SERVER

### Instrucciones de como montar esta aplicación:

1. Clonar el archivo .env.template y renombrarlo a .env
2. Configurar las siguientes variables de entorno:

- Generales:

  | Variable              | Ejemplo               | Descripción                                                                   |
  | --------------------- | --------------------- | ----------------------------------------------------------------------------- |
  | PORT                  | 3000                  | puerto donde se iniciara la aplicación                                        |
  | PUBLIC_PATH           | public                | Ruta de donde estaran los archivos publicos como el index.html                |

___

- Bases de datos:

  - POSTGRES

   | Variable              | Ejemplo                                            | Descripción                                   |
   | --------------------- | -------------------------------------------------- | --------------------------------------------- |
   | POSTGRES_URL          | postgresql://postgres:123456@localhost:5432/TODO   | URL de conexión a la base de datos PostgreSQL |
   | POSTGRES_USER         | postgres                                           | Usuario de la base de datos                   |
   | POSTGRES_DB           | todo                                               | Nombre de la base de datos                    |
   | POSTGRES_PORT         | 5432                                               | Puerto de la base de datos                    |
   | POSTGRES_PASSWORD     | 123456                                             | Contraseña del usuario de la base de datos    |

3. Ejecutar los siguientes comandos:
- ``` npm install ```
- ``` docker compose up -d ```

5. Finalmente, con este comando se inicia la aplicación: ``` npm run dev ```
