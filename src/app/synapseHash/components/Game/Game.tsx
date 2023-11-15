import { useEffect, useRef, useState } from "react"
import Phaser from "phaser"
import Button from "antd/lib/button"
import { FaPlay } from "react-icons/fa"

import styles from "../../../../styles/synapseHash/components/Game/Game.module.scss"
import type { NeuronType, ConnectionType, ConnectionsStatusType } from "../../../../types/synapseHash"
import configs from "../../../../configs/synapseHash"
import { addRandomNeurons } from "./utils/functions"
import ScoreAlert from "../../../globals/components/ScoreAlert/ScoreAlert"
import CompletedAlert from "./components/CompletedAlert/CompletedAlert"


const {
    backgroundColor
} = { ...configs };

const Game = () => {
    const [connectionsCount, setConnectionsCount] = useState<number>(0);
    const [status, setStatus] = useState<ConnectionsStatusType>(false);
    const scene = useRef<any>(null);
    const possibleConnections = useRef<number>(0);

    useEffect(() => {
        if (!status) {
            class NetWork extends Phaser.Scene {
                neurons: NeuronType[] = [];
                clickedNeuron: string = "";
                neuronConnections: ConnectionType[] = [];

                constructor(props?: any) {
                    super(props)
                }

                preload = () => {
                    this.load.image("neuronFrame", "./synapseHash/neuron.png");
                    this.load.image("connectionFrame", "./synapseHash/connection.png");
                    this.load.image("connectionElectrifiedFrame1", "./synapseHash/connectionElectrified1.png")
                    this.load.image("connectionElectrifiedFrame2", "./synapseHash/connectionElectrified2.png")
                    this.load.image("connectionElectrifiedFrame3", "./synapseHash/connectionElectrified3.png")
                    this.load.image("connectionElectrifiedFrame4", "./synapseHash/connectionElectrified4.png")
                    this.load.image("neuronElectrifiedFrame", "./synapseHash/neuronElectrified.png");
                    this.load.image("clickedNeuronFrame", "./synapseHash/neuronBlur-removebg-preview.png");
                }
                create = () => {
                    addRandomNeurons(this,
                        (connections: number) => {
                            if (connections === possibleConnections.current) setStatus("completed")
                            setConnectionsCount((currCount:number) => currCount + connections)
                        },
                        (neuronsCount: number) => possibleConnections.current = neuronsCount * (neuronsCount - 1) / 2);
                    this.cameras.main.setBackgroundColor(backgroundColor)
                }
            }

            scene.current = new NetWork();
            const phaserContainer = document.querySelector("#phaser-container");
            if (phaserContainer) {
                phaserContainer.innerHTML = "";
            }
            new Phaser.Game({
                type: Phaser.AUTO,
                width: "100%",
                height: "100%",
                parent: "phaser-container",
                scene: scene.current,
                physics: {
                    default: 'arcade',
                },
            })
        }
    }, [status, Phaser, addRandomNeurons, setConnectionsCount, setStatus])

    return (
        <>
            {status && <CompletedAlert
                status={status}
                setStatus={setStatus} />}
            <ScoreAlert
                score={connectionsCount}
                mode="custom" />
            <Button 
              className={styles.skip_button}
              onClick={() => setStatus("skipped")}
            >
                <FaPlay />
            </Button>
            <div
                id="phaser-container"
                className={styles.phaser_cont} />
        </>
    )
}

export default Game;
