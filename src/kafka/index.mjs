import {Kafka} from "kafkajs";

const  kafka = new Kafka(
    {
        clientId: "tg-bot-cheese",
        brokers: ["localhost:9092"],
    }
);

const producer = kafka.producer()

export const sentKafkaMessage = async (message) => {
    await producer.connect()
    await producer.send({
        topic: "tg_cheese_messages",
        messages: [
            { value: message },
        ]
    })
    await producer.disconnect();
}

const consumer = await kafka.consumer({groupId: "cheese-bot-group"})

export const runConsumer = async () => {
    await consumer.connect()
    await consumer.subscribe({
        topic: "tg_cheese_messages",
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message}) => {
            console.log({
                log: "KAFKA LOG",
                partition,
                offset: message.offset,
                value: message.value.toString()
            })
        }
    })
}

