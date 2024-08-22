import { useState } from "react"
import { FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

function App() {
  const videos = ["https://www.youtube.com/embed/vVJuMq1CMNo?si=XAp9653D1mh3Wq_p",
    "https://www.youtube.com/embed/72eGw4H2Ka8?si=CSHYEPgaREW9EdfF",
    "https://www.youtube.com/embed/dvjy6V4vLlI?si=9qiOtouZPfuWUnWR",
    "https://www.youtube.com/embed/5tSTk1083VY?si=f9JpFLy1XMlrb9mf",
    "https://www.youtube.com/embed/vXc0Jmn-frw?si=bMQw_ifTkFQlUfUk",
    "https://www.youtube.com/embed/n_Dv4JMiwK8?si=eSNSAMc2WSn3FMhP"
  ]
  const [panels, setPanels] = useState([videos[0]])
  // const [startIndex, setStartIndex] = useState(0)
  const [dimensions, setDimensions] = useState([1])

 

  function calculateDimensions() {
    dimensions.length = Math.floor(Math.sqrt(panels.length))
    const minWidth = Math.floor(panels.length / dimensions.length)
    const numExtraWide = panels.length % dimensions.length

    for (let i = 0; i < numExtraWide; i++) {
      dimensions[i] = minWidth + 1
    }
    for (let i = numExtraWide; i < dimensions.length; i++) {
      dimensions[i] = minWidth;
    }

    console.log(dimensions)
  }

  function generateRows() {
    let startIndex = 0

    if (dimensions.length > 5) {
      return (<div className="flex h-screen items-center justify-center">you're cooked</div>)
    } else {
      return (
        <div className="h-full">
          {
            dimensions.map((row, index) => {
              const toReturn = generateCols(startIndex, row)
              const height = dimensions.length === 1 ? "h-full" : `h-1/${dimensions.length}`
              startIndex += row
              console.log("generating row " + index)
              return (
                <div className={height}> {toReturn}
                </div>

              )

            })
          }
        </div>
      )
    }


  }

  function deletePanel(e, panel) {
    console.log("deleting, ", panel)
    for (let i = 0; i < panels.length; i++) {
      if (panels[i] === panel) {
        setPanels(panels.slice(0, i).concat(panels.slice(i + 1, panels.length)))
        break;
      }
    }

  }

  function updateContent(value, index) {
    console.log(value.target.value)
    const temp = panels.slice(0, index)
    temp.push(videos[value.target.value])
    console.log(temp)
    setPanels(temp.concat(panels.slice(index + 1, panels.length)))
  }


  function generateCols(startIndex, numCols) {
    const styling = `grid grid-cols-${numCols} h-full`
    return (
      <div className={styling}>
        {panels.map((panel, index) => {
          if (index >= startIndex && index < startIndex + numCols) {
            console.log("generating col", panel)
            return (
              <div>
                <div className="p-2 flex items-center justify-between">
                  <div className="flex justify-center w-full ">
                    <select className="bg-sky-100 p-1 px-2 rounded-full font-sans font-medium" name="content" onChange={(e) => updateContent(e, index)}>
                      <option value="0">GTA Car Videos</option>
                      <option value="1">Family Guy</option>
                      <option value="2">Subway Surfers</option>
                      <option value="3">David Goggins</option>
                      <option value="4">Mobile Games Gameplay</option>
                      <option value="4">Minecraft Parkour</option>
                    </select>
                  </div>


                  {dimensions !== 1 && (
                    <button className="float-right text-xl hover:scale-125 duration-200" onClick={(e) => deletePanel(e, panel)}>
                      <IoMdClose />
                    </button>
                  )}
                </div>

                <iframe
                  src={panel}
                  frameborder='0'
                  allow='autoplay; encrypted-media'
                  allowfullscreen
                  title='video'
                  className="w-full h-5/6"
                  style={{ height: `${94.5 - 5.5 * (dimensions.length - 1)}%` }}
                />
              </div>
            )
          }
        })}
      </div>
    )
  }

  function callFunctions() {
    calculateDimensions()
    return (generateRows())
  }

  function addPanel() {
    setPanels([...panels, videos[0]]);
  }

  return (
    <div className="h-screen">
      {
        callFunctions()
      }
      <button onClick={addPanel} className="absolute bottom-16 right-16 p-4 bg-violet-600	text-3xl shadow-xl hover:scale-110 duration-200 text-white rounded-full">
        <FiPlus />
      </button>

    </div>
  );
}



export default App;
