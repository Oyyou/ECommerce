# Setup
1. Create a `.env` file at the top most directory (`.\ECommerce`)
2. Copy the fieds from the `.env.sample` file into the new `.env` file
3. Replace `[Fill]` with relevant data. The password can be whatever you want and the `APP_SECRET` can be something from here: https://randomkeygen.com/ ('9sf98UpVokNr-~(v1XEwE4~0B+S7Jq' for example)
4. From `.\ECommerce` run `docker compose build`
5. From `.\ECommerce` run `docker compose up`
6. From `.\ECommerce.DAL` run `dotnet ef database update -s ../ECommerce.API`
