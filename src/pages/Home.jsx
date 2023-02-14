import Healthy from "../components/Healthy";
import Favorites from "../components/Favorites";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div 
        animate = {{opacity:1}}
        initial = {{opacity: 0}}
        exit = {{opacity: 0}}
        transition = {{duration: 0.5}}>
        <Healthy />
        <Favorites />
    </motion.div>
  )
}
