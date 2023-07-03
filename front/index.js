const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else return "방금 전";
};

const renderData = (data) => {
  const main = document.querySelector("main");
  data.reverse().forEach(async (obj) => {
    const itemListDiv = document.createElement("div");
    itemListDiv.className = "main-items";

    const imgDiv = document.createElement("div");
    imgDiv.className = "main-items__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const InfoDiv = document.createElement("div");
    InfoDiv.className = "main-items__info";

    const InfoTitleDiv = document.createElement("div");
    InfoTitleDiv.className = "main-items__info-title";
    InfoTitleDiv.innerText = obj.title;

    const InfoMetaDiv = document.createElement("div");
    InfoMetaDiv.className = "main-items__info-meta";
    InfoMetaDiv.innerText = obj.place + " · " + calcTime(obj.insertAt);

    const InfoPriceDiv = document.createElement("div");
    InfoPriceDiv.className = "main-items__info-price";
    InfoPriceDiv.innerText = obj.price;

    imgDiv.appendChild(img);

    InfoDiv.appendChild(InfoTitleDiv);
    InfoDiv.appendChild(InfoMetaDiv);
    InfoDiv.appendChild(InfoPriceDiv);
    itemListDiv.appendChild(imgDiv);
    itemListDiv.appendChild(InfoDiv);

    main.appendChild(itemListDiv);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  console.log(data);
  renderData(data);
};

fetchList();
