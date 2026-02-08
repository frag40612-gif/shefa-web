import { motion } from 'framer-motion'
import { fadeUp, fadeDown, fadeLeft, fadeRight, fadeIn } from '../animations/scrollVariants'

const variants = { up: fadeUp, down: fadeDown, left: fadeLeft, right: fadeRight, fade: fadeIn }

const ScrollReveal = ({ children, delay = 0, variant = 'up' }) => {
  const v = variants[variant] || fadeUp
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        ...v,
        visible: {
          ...v.visible,
          transition: {
            ...v.visible.transition,
            delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
