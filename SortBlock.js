import {} from "./script.js";
import {sortTasksByText, sortTasksByDate} from "./functions.js";

export class SortBlock {
  static createHtml() {
    return `
    <div class="sort-block-container">
      <button class="button" id="textSortButton">Sort by text</button>
      <button class="button" id="textDateButton">Sort by date</button> <br>
      <button class="button" id="filterButton" style="margin-top: 15px;">Filter</button>
      <input placeholder="Enter text for filtering" type="text" id="filterInput">
      <button class="button" id="buttonCancel">Cancel</button>
    </div>
    `;
  }

  
  static createSortBlock() {
    const sectionSortBlock = SortBlock.createSectionSortBlock();

    sectionSortBlock.innerHTML = SortBlock.createHtml();
    document.body.append(sectionSortBlock);
    SortBlock.addListeners();
  }


  static removeSortBlock() {
    document.querySelector('.sort-block').remove();
  }

  
  static createSectionSortBlock() {
    const sectionSortBlock = document.createElement("section");

    sectionSortBlock.classList.add("sort-block");
    return sectionSortBlock;
  }

  
  static addListeners() {
    document.querySelector("#textSortButton").addEventListener("click", function () {
      sortTasksByText();
      SortBlock.removeSortBlock();
    })

    document.querySelector("#textDateButton").addEventListener("click", function () {
      sortTasksByDate();
      SortBlock.removeSortBlock();
    })

    document.querySelector("#filterButton").addEventListener("click", function () {
      SortBlock.removeSortBlock();
    })

    document.querySelector("#buttonCancel").addEventListener("click", function () {
      SortBlock.removeSortBlock();
    });
  }
}