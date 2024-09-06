export const getShortWeatherIcon = (data, state, setState) => {
  const stateCopy = [...state];
  for (let i = 0; i < data.length - 2; i++) {
    const { sky, pty } = data[i];
    if (pty === "0") {
      if (sky === "1") {
        stateCopy[i] = "clear";
      } else if (sky === "3") {
        stateCopy[i] = "cloudy";
      } else if (sky === "4") {
        stateCopy[i] = "overcast";
      }
    } else {
      if (pty === "1" || pty === "4") {
        stateCopy[i] = "rain";
      } else if (pty === "2") {
        stateCopy[i] = "sleet";
      } else if (pty === "3") {
        stateCopy[i] = "snow";
      }
    }
    setState(stateCopy);
  }
};

export const getMidWeatherIcon = (data, state, setState) => {
  const stateCopy = [...state];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item === "맑음") {
      stateCopy[i + 2] = "clear";
    } else if (item === "구름많음") {
      stateCopy[i + 2] = "cloudy";
    } else if (item === "흐림") {
      stateCopy[i + 2] = "overcast";
    } else if (
      item === "비" ||
      item === "소나기" ||
      item === "구름많고 비" ||
      item === "구름많고 소나기" ||
      item === "흐리고 비" ||
      item === "흐리고 소나기"
    ) {
      stateCopy[i + 2] = "rain";
    } else if (
      item === "비/눈" ||
      item === "구름많고 비/눈" ||
      item === "흐리고 비/눈"
    ) {
      stateCopy[i + 2] = "sleet";
    } else if (
      item === "눈" ||
      item === "구름많고 눈" ||
      item === "흐리고 눈"
    ) {
      stateCopy[i + 2] = "snow";
    }
  }
  setState(stateCopy);
};
