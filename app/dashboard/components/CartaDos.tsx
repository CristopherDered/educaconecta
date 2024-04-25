 
import getCursosInscritos from '@/app/actions/getCursosInscritos'
import React from 'react'

const CartaDos = async (info :any) => {
    const cursos = await getCursosInscritos(info.info.email)
  return (
    <div>CartaDos</div>
  )
}

export default CartaDos