import {tasksArray} from "./script.js";
import {Task} from "./Task.js";

export class PopUp {
  constructor(obj) {
    Object.assign(this, obj);
  }


  createHtml() {
    return `
    <div class="pop-container">
      <h2>${this.popUpType} the task</h2>
      <input placeholder="Enter the task name" type="text" id="taskName" required value="${this.taskName}">
      <p>Expiration date:</p>
      <input type="date" id="expirationDate" required value="${this.expirationDate}">
      <button class="button" id="taskButtonOk">Ok</button>
      <button class="button" id="taskButtonCancel">Cancel</button>
    </div>
    `;
  }


  static addListeners(element) {
    element ? PopUp.addListenerChangePopUp(element) : PopUp.addListenerCreatePopUp();
    document.querySelector("#taskButtonCancel").addEventListener("click", function () {
      PopUp.removePopUp();
    });
  }


  static addListenerChangePopUp(element) {
    document.querySelector("#taskButtonOk").addEventListener("click", function () {
      const taskName = document.querySelector("#taskName").value;
      const expirationDate = document.querySelector("#expirationDate").value;

      if (taskName && expirationDate) {
        element.taskName = taskName;
        element.expirationDate = expirationDate;
        document.getElementById(`${element.id}`).firstElementChild.firstElementChild.firstElementChild.innerHTML = `${taskName}`;
        document.getElementById(`${element.id}`).firstElementChild.lastElementChild.firstElementChild.innerHTML = `${expirationDate}`;
        PopUp.removePopUp();
      }
    });
  }


  static addListenerCreatePopUp() {
    document.querySelector("#taskButtonOk").addEventListener("click", function () {
      const taskName = document.querySelector("#taskName").value;
      const expirationDate = document.querySelector("#expirationDate").value;
      
      if (taskName && expirationDate) {
        const task = new Task({taskName, expirationDate});

        tasksArray.push(task);
        document.querySelector("#tasks").innerHTML += task.createHtml();
        PopUp.removePopUp();
      }
    });
  }


  static createPopUp(id) {
    const sectionPopUp = PopUp.createSectionPopUp();
    const element = tasksArray.find((item) => item.id === id);
    let popUp;
    
    if (id) {
      popUp = new PopUp({
        popUpType: 'Change',
        taskName: element.taskName,
        expirationDate: element.expirationDate,
      });
    } else {
      popUp = new PopUp({
        popUpType: 'Create',
        taskName: '',
        expirationDate: '',
      });
    }

    sectionPopUp.innerHTML = popUp.createHtml();
    document.body.append(sectionPopUp);
    PopUp.addListeners(element);
  }


  static removePopUp() {
    document.querySelector('.pop').remove();
  }

  
  static createSectionPopUp() {
    const sectionPopUp = document.createElement("section");

    sectionPopUp.classList.add("pop");
    return sectionPopUp;
  }
}