use app::validation::HistoricalData;
use dotenv::dotenv;
use mongodb::{options::ClientOptions, Client, Collection};
use std::env;

async fn setup() -> Collection<HistoricalData> {
    dotenv().ok();
    let mongo_uri = env::var("MONGO_URI").expect("MONGO_URI must be set");
    let client_options = ClientOptions::parse(&mongo_uri).await.unwrap();
    let client = Client::with_options(client_options).unwrap();

    let db = client.database("milData");
    let collection: mongodb::Collection<HistoricalData> = db.collection("historicalData");

    return collection;
}

pub async fn mongo() -> u64 {
    let collection = setup().await;
    let count = collection.count_documents(None, None).await.unwrap();
    count
}
