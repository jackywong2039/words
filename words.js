window.onload = function() {
    var showTranslationBtn = document.getElementById("showTranslationBtn");
    var refreshBtn = document.getElementById("refreshBtn");
    var wordContainer = document.getElementById("wordContainer");
    var translationContainer = document.getElementById("translationContainer");
  
    var englishWords = [];
    var chineseWords = [];
  
    // 載入英文單字和中文解釋
    function loadWords() {
      var xhrEnglish = new XMLHttpRequest();
      xhrEnglish.onreadystatechange = function() {
        if (xhrEnglish.readyState === 4 && xhrEnglish.status === 200) {
          englishWords = xhrEnglish.responseText.split("\n");
        }
      };
      xhrEnglish.open("GET", "english.txt", true);
      xhrEnglish.send();
  
      var xhrChinese = new XMLHttpRequest();
      xhrChinese.onreadystatechange = function() {
        if (xhrChinese.readyState === 4 && xhrChinese.status === 200) {
          chineseWords = xhrChinese.responseText.split("\n");
        }
      };
      xhrChinese.open("GET", "chinese.txt", true);
      xhrChinese.send();
    }
  
    // 隨機抽取單字
    function selectWords() {
      wordContainer.innerHTML = "";
      translationContainer.innerHTML = "";
  
      var selectedIndices = [];
  
      while (selectedIndices.length < 10) {
        var index = Math.floor(Math.random() * englishWords.length);
        if (!selectedIndices.includes(index)) {
          selectedIndices.push(index);
        }
      }
  
      for (var i = 0; i < 10; i++) {
        var wordWrapper = document.createElement("div");
        wordWrapper.classList.add("word-wrapper");
        wordContainer.appendChild(wordWrapper);
  
        var word = document.createElement("div");
        word.classList.add("word");
        word.textContent = englishWords[selectedIndices[i]];
        wordWrapper.appendChild(word);
  
        var translation = document.createElement("div");
        translation.classList.add("translation");
        translation.textContent = "";
        wordWrapper.appendChild(translation);
      }
  
      showTranslationBtn.disabled = false;
    }
  
    // 顯示中文解譯
    function showTranslation() {
      var wordWrappers = wordContainer.getElementsByClassName("word-wrapper");
  
      for (var i = 0; i < wordWrappers.length; i++) {
        var word = wordWrappers[i].querySelector(".word");
        var translation = wordWrappers[i].querySelector(".translation");
        var index = englishWords.indexOf(word.textContent);
  
        if (index >= 0) {
          translation.textContent = chineseWords[index];
        }
      }
    }
  
    // 重新抽取單字
    function refreshWords() {
      wordContainer.innerHTML = "";
      translationContainer.innerHTML = "";
      showTranslationBtn.disabled = true;
      selectWords();
    }
  
    loadWords();
    refreshBtn.addEventListener("click", refreshWords);
    showTranslationBtn.addEventListener("click", showTranslation);
  };