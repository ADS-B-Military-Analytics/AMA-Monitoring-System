// Keep in mind that this is my first time using Rust, so I'm sure there are better ways to do this.

pub mod validation {
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize, Debug)]
    pub struct MainData {
        pub hex: String,
        pub flight: String,
        pub t: String,
        pub r: String,
        pub squawk: i32,
    }

    #[derive(Serialize, Deserialize, Debug)]
    pub struct AircraftCount {
        #[serde(rename = "type")]
        pub ac_type: String,
        pub count: i32,
    }

    #[derive(Serialize, Deserialize, Debug)]
    pub struct HistoricalData {
        pub _id: String,
        pub data: Vec<MainData>,
        pub stats: Vec<AircraftCount>,
        pub inter: Vec<MainData>,
    }
}
