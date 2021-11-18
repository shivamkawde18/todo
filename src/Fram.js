import "./Style.css";
import { useEffect, useState } from "react";
function Fram() {
  let [textBox, setTextBox] = useState(false);
  let [taskDes, setTaskDes] = useState();
  let [taskArray, setTaskArry] = useState([]);
  let [completedTask, setCompleted] = useState();
  let [list, setList] = useState([]);
  let [comFlag, setComFlag] = useState(false);
  let[rerender,setRerender]=useState(0)
  let[comRerender,setComRerender]=useState(0)
  useEffect(() => {
    let str =
      localStorage.getItem("task") != null ? localStorage.getItem("task") : "";
    console.log(str.length);
    //let fstr="";
    let count = list.length;
    let tem = "";
    let arr = [];

    for (let i = 0; i < str.length; i++) {
      //console.log(str[i])

      if (str[i] === ",") {
        arr.push(tem);
        tem = "";
      } else {
        tem = tem + str[i];
      }
    }

    setList(arr);
    // setList(list=>[...list,localStorage.getItem("task")])
  }, [rerender]);

  useEffect(() => {
    let str =
      localStorage.getItem("completeTask") != null
        ? localStorage.getItem("completeTask")
        : "";
    let tem = "";
    let arr = [];

    for (let i = 0; i < str.length; i++) {
      //console.log(str[i])

      if (str[i] === ",") {
        arr.push(tem);

        tem = "";
      } else {
        tem = tem + str[i];
      }
    }

    setCompleted(arr);

    // setList(list=>[...list,localStorage.getItem("task")])
  }, [comRerender]);

  return (
    <>
      <div className="mainDiv">
        <h1>Todo List</h1>
        <div className="taskList">
          {list.map((e) => {
            return (
              <div className="content">
                <input
                  className="input"
                  type="checkbox"
                  checked={true}
                  onChange={(ee) => {
                      console.log(ee.currentTarget.value)
                    if (localStorage.getItem("completeTask") != null)
                      localStorage.setItem(
                        "completeTask",
                        localStorage.getItem("completeTask") + e + ","
                      );
                    else localStorage.setItem("completeTask", e + ",");
                  }}
                />
                <div
                  className="para"
                  contentEditable="true"
                  onKeyUp={(ee) => {
                    console.log(ee.currentTarget.innerText);
                    console.log(e);

                    let str =
                      localStorage.getItem("task") != null
                        ? localStorage.getItem("task")
                        : "";
                    console.log(str.length);
                    let tem = "";
                    let arr = [];
                    let ans = "";
                    for (let i = 0; i < str.length; i++) {
                      //console.log(str[i])

                      if (str[i] === ",") {
                        if (tem === e) {
                          //arr.push(ee.currentTarget.innerText);
                          ans = ans + ee.currentTarget.innerText + ",";
                          tem = "";

                          localStorage.setItem("task", ans);
                        } else {
                          //arr.push(tem)
                          ans = ans + tem + ",";
                          tem = "";
                          localStorage.setItem("task", ans);
                        }
                      } else {
                        tem = tem + str[i];
                      }
                    }

                    console.log(ans);
                    //   localStorage.setItem("task",ans)
                  }}
                >
                  {e}
                </div>
                <button
                  className="deleteBtn"
                  onClick={() => {
                    let str = localStorage.getItem("task");

                    let tem = "";
                    let arr = [];
                    let flag = false;

                    for (let i = 0; i < str.length; i++) {
                      //console.log(str[i])

                      if (str[i] === ",") {
                        if (tem !== e) {
                          localStorage.clear();

                          localStorage.setItem("task", tem + ",");
                          arr.push(tem);
                          flag = true;
                        }

                        tem = "";
                      } else {
                        tem = tem + str[i];
                      }
                    }
                    if (!flag) localStorage.clear();
                    setList(arr);
                  }}
                >
                  X
                </button>
                <br />
              </div>
            );
          })}
        </div>

        {textBox ? (
          <>
            {" "}
            <input
              className="smallInput"
              type="text"
              onKeyUp={(e) => {
                setTaskDes(e.currentTarget.value);
              }}
            />{" "}
            <button
              onClick={() => {
                //  setTaskArry( taskArray=> [...taskArray,taskDes])
                //console.log(localStorage.getItem("task"));
                if (localStorage.getItem("task") != null)
                  localStorage.setItem(
                    "task",
                    localStorage.getItem("task") + taskDes + ","
                  );
                else localStorage.setItem("task", taskDes + ",");
                setTextBox(false);

                setRerender(rerender+1)
              }}
              className="smallBtn"
            >
              add
            </button>
            <button
              className="cancelTextBox"
              onClick={() => {
                setTextBox(false);
              }}
            >
              X
            </button>
          </>
        ) : (
          ""
        )}

        {textBox ? (
          ""
        ) : (
          <button
            className="mainBtn"
            onClick={() => {
              setTextBox(true);
            }}
          >
            add task
          </button>
        )}
    
        {comFlag ? (
          completedTask.map((e) => {
            return (
              <div className="comTask">
                <h1>{e}</h1>
              </div>
            );
          })
        ) : (
          <></>
        )}

        <button
          className="completedTask"
          onClick={() => {
            console.log(completedTask);
            setComFlag(true);


            setComRerender(comRerender+1)
          }}
        >
          Completed Task
        </button>
      </div>
    </>
  );
}
export default Fram;
