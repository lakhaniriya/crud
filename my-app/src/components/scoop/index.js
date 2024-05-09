import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { scoopQuntity } from '../../redux/demoSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.scoop)

  const dispatch = useDispatch()

  return (
    <div>
      <div>
       {
        count?.map((val,index)=> {
          return<>
          <div>
            {val.name}
          </div>
          <div>
            <input type="number" value={val.qu} onChange={(e) => dispatch(scoopQuntity({id:index,value:e.target.value}))}  />
          </div>
          </>
        })
       }
        {/* <span>{count}</span>
        */}
      </div>
    </div>
  )
}