import { useEffect, useRef, useState } from "react"
import Phaser from "phaser"
import Button from "antd/lib/button"
import { FaPlay } from "react-icons/fa"

import styles from "../../../../styles/synapseHash/components/Game/Game.module.scss"
import type { Neuron, Connection } from "../../../../types/synapseHash"
import configs from "../../../../configs/synapseHash"
import { addRandomNeurons } from "./utils/functions"
import ScoreAlert from "../../../globals/components/ScoreAlert/ScoreAlert"
import CompleteAlert from "./components/CompletedAlert/CompletedAlert"
import Loading from "../../../globals/components/Loading/Loading"

const {
    backgroundColor
} = { ...configs };

const Game = () => {
    const [connectionsCount, setConnectionsCount] = useState<number>(0);
    const [showSkipStatus, setShowSkipStatus] = useState<boolean>(false);
    const [initializeGame, setInitializeGame] = useState<boolean>(true);

    const scene = useRef<any>(null);
    const possibleConnections = useRef<number>(0);

    useEffect(() => {
        if (initializeGame) {
            class NetWork extends Phaser.Scene {
                neurons: Neuron[] = [];
                clickedNeuron: string = "";
                neuronConnections: Connection[] = [];

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
                            if (connections === possibleConnections.current) setInitializeGame(true);
                            setConnectionsCount((currCount:number) => currCount + 1)
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
            setInitializeGame(false);
        }
    }, [showSkipStatus, Phaser, initializeGame, setInitializeGame, addRandomNeurons, setConnectionsCount, setShowSkipStatus])

    return (
        <>
            {showSkipStatus && <CompleteAlert
                status={showSkipStatus}
                startNew={() => setInitializeGame(true)}
                setStatus={setShowSkipStatus} />}
            <ScoreAlert
                score={connectionsCount}
                mode="custom" />
            <Button 
              className={styles.skip_button}
              onClick={() => setShowSkipStatus(true)}
            >
                <FaPlay />
            </Button>
           {initializeGame && <Loading /> }
           <div
                id="phaser-container"
                className={styles.phaser_cont} />
        </>
    )
}

export default Game;
