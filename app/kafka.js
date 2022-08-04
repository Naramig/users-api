const { Kafka } = require("kafkajs");

let producer;

exports.init = async () => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": [process.env.KAFKA_URL],
            "ssl": false
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
        "topic": "Users",
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