const { Kafka } = require("kafkajs");

exports.producer = null;

exports.init = async () => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": [process.env.KAFKA_URL],
            "ssl": false
        })

        exports.producer = kafka.producer();
        console.log("Connection...")
        await exports.producer.connect()
        console.log("connected")
    } catch (e) {
        console.log("Error", e);
    }
}

exports.close = async () => {
    if (exports.producer){
        await exports.producer.disconnect();
    }
}