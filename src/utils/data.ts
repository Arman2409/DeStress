import Home from "../pages/Home/Home";
import OceanFlow from "../pages/OceanFlow/OceanFlow";
import Roshambo from "../pages/Roshambo/Roshambo";
import SynapseHash from "../pages/SynapseHash/SynapseHash";

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