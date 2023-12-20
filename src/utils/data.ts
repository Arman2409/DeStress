import Home from "../app/Home";
import OceanFlow from "../app/oceanFlow/page";
import Roshambo from "../app/roshambo/page";
import SynapseHash from "../app/synapseHash/page";

export const routes = [
    {
        key: "home",
        path: "/",
        component: Home
    },
    {
        key: "synapseHash",
        path: "/synapseHash",
        component: SynapseHash
    },
    {
        key: "oceanFlow",
        path: "/oceanFlow",
        component: OceanFlow
    },
    {
        key: "roshambo",
        path: "/roshambo",
        component: Roshambo
    },
]