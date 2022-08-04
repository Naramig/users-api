const { Kafka } = require("kafkajs");

let producer;

exports.init = async () => {
    try {
        const kafka = new Kafka({
            "clientId": process.env.KAFKA_CLIENT_ID,
            "brokers": [process.env.KAFKA_URL],
            "ssl": false,
            "waitForLeaders": true,
        })

        producer = kafka.producer();
        console.log("Connection...")
        await producer.connect()
        console.log("connected")
    } catch (e) {
        console.log("Error", e);
    }
}

exports.sendMsg = async (data) => {
    const result = await producer.send({
        "topic": process.env.KAFKA_TOPIC,
        "messages": [
            {
                "value": data,
            }
        ]
    })
    console.log("Done!", result)
}

exports.close = async () => {
    if (producer){
        await producer.disconnect();
    }
}