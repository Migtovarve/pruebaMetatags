import { useEffect } from "react";
import { cdnUrl, fallbackRestUrl } from "./path";
import { IncomingMessage } from "http";

export const normalizedArray = (response: any) => (response ? response : []);

export const normalized = (response: any) => (response ? response : {});

export const actionObject = (type: string, payload: any = null) => ({
  type,
  payload,
});

export const paginate = (
  items: Array<any>,
  page_number: number = 1,
  page_size: number = 15
) => {
  return items?.slice((page_number - 1) * page_size, page_number * page_size);
};

export const scrollTo = (ref: any, offset = 0) => {
  window.scrollTo({ top: ref.offsetTop - offset, behavior: "smooth" });
};

export const createMarkup = (text: any) => {
  return { __html: text };
};

export const validateFetch = ({ errors, data }: any) => {
  if (errors) throw errors[0].message;
  if (typeof data == "undefined") throw new Error("Cannot connect");

  return data;
};

export const roundNumber = (number: any) => Math.round(number * 100) / 100;

export const elementId = (id: string) => {
  const element: any = document.querySelector(id);
  return element.id;
};

export const parseDate = (currentDate: any) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return `${day}/${month}/${year}`;
};

export const parseHour = (data: any) => {
  const date = new Date(data);
  let minutes: any = date.getMinutes();
  let hour: any = date.getHours();
  const setHour = hour === 0 ? 12 : hour;
  hour = hour > 12 ? hour - 12 : setHour;
  hour = hour < 10 ? `0${hour}` : hour;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const afternoon = date.getHours() > 11 ? "PM" : "AM";
  return `${hour}:${minutes} ${afternoon}`;
};

export const buildSimpleArray = (key: string, array: any = []): Array<any> => {
  let newArray: any = [];
  array.forEach((item: any, index: number) => {
    newArray[index] = item[key];
  });

  return newArray;
};

export const sleep = (time: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const buildRTF = (rtf: any, label: any, style?: any) => {
  if (typeof rtf?.value !== "string" && rtf) {
    let finalElement = `<div class='${style}'>`;

    for (const paragraph of rtf) {
      let element = `<${label}>`;

      for (const child of paragraph.children) {
        const text = child?.text;
        let style = "";
        for (const childType in child) {
          if (child[childType] && childType === "italic")
            style += `font-style:${childType};`;
          if (child[childType] && childType === "underline")
            style += `text-decoration: ${childType};`;
          if (child[childType] && childType === "bold")
            style += `font-weight: ${childType};`;
        }
        element += `<span style='${style}'>${text}</span>`;
      }

      element += `</${label}>`;
      finalElement += element;
    }
    finalElement += `</div>`;
    return finalElement;
  }

  return "";
};
export const getRandomInt = (min: any, max: any) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const getUrl = (form: any) => {
  let url = `api/vdb/filters?`;
  for (const key in form) {
    if (key === "type") {
      url += `${key}=${form[key]}&`;
    }
    if (key === "shapes") {
      form[key].forEach((item: any) => {
        url += `${key}=${item}&`;
      });
    }
    if (form[key] && key !== "shapes" && key !== "type") {
      url += `${key}=${form[key]}&`;
    }
  }
  let urlSlice = url.endsWith("&") ? url.slice(0, -1) : url;
  return urlSlice;
};

export const toCamelCase = (string: any) => {
  const split = string.split(" ");
  let newWords = "";
  for (let a = 0; a < split?.length; a++) {
    const word = split[a];
    let newWord = "";
    for (let i = 0; i < word?.length; i++) {
      if (i === 0) {
        newWord += word[i].toUpperCase();
        continue;
      }
      newWord += word[i];
    }

    newWords += newWord;
    if (split.length !== a + 1) newWords += " ";
  }
  return newWords;
};

export const initOptimize = (callback: any, OPT_CONTAINER_ID: any) => {
  const script = document.createElement("script");
  script.src = `https://www.googleoptimize.com/optimize.js?id=${OPT_CONTAINER_ID}`;
  script.id = "google-optimize";
  script.onload = callback;
  document.body.appendChild(script);
};

export function useOutsideAlerter(ref: any, funct: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (funct) {
          funct();
        } else {
          alert("You clicked outside of me!");
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export const checkImageSource = (image: any) => {
  return !image?.name
    ? `${fallbackRestUrl}/assets/${image?.file || image}`
    : String(image?.name).includes("cms/images") || String(image?.name).includes("ecommerce/variant-images")
      ? `${cdnUrl}${image?.name}`
      : `${fallbackRestUrl}/assets/${image?.name}`;
};

export const formatPhoneNumber = (value: any) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");

  const pnLength = phoneNumber.length;
  if (pnLength < 4) return phoneNumber;
  if (pnLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
};

export const checkWorkingHours = () => {
  const currentDateTime = new Date();
  const weekDay = currentDateTime.toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
  });
  const hour = currentDateTime.toLocaleString("en-US", {
    timeZone: "America/New_York",
    hourCycle: "h24",
    hour: "2-digit",
  });
  const minutes = currentDateTime.toLocaleString("en-US", {
    timeZone: "America/New_York",
    minute: "2-digit",
  });

  const numberHour = Number(hour);
  const numberMinutes = Number(minutes);
  if (weekDay === "Saturday") {
    if (numberHour >= 9 && numberHour <= 16 && numberMinutes <= 60) return true;
    return false;
  }
  if (weekDay === "Sunday") {
    if (numberHour >= 11 && numberHour <= 18 && numberMinutes <= 60)
      return true;
    return false;
  }
  if (numberHour >= 10 && numberHour <= 19 && numberMinutes <= 60) {
    /* if (numberHour === 17 && numberMinutes <= 30) return false; */
    return true;
  }
  return false;
};

export const generateCartBack = (newItems: any) => {
  return {
    cart_status: newItems?.status,
    cart_thumbs_urls_1st: newItems?.cart?.map((item: any) => item?.cart_thumbs_urls_1st ?
      item?.cart_thumbs_urls_1st : item?.variant?.jpgImage),
    cart_contents_names: newItems?.cart?.map((item: any) => item?.name),
    cart_contents_urls: newItems?.cart?.map(
      (item: any) => item?.cart_content_url || item?.url
    ),
    cart_thumbs_urls: newItems?.cart?.map(
      (item: any) => item?.variant?.images[0]
    ),
    cart_urlPath: newItems?.cart?.map(
      (item: any) => item?.variant?.urlPath
    ),
    cart_content_price: newItems?.cart?.map(
      (item: any) => {
        if (!item?.alternativeVariant) {
          if (item?.variant?.basePrice !== item?.variant?.price) return item?.variant?.basePrice;
        };
        return item?.variant?.price;
      }
    ),
    cart_content_base_price: newItems?.cart?.map(
      (item: any) => {
        if (!item?.alternativeVariant) {
          if (item?.variant?.basePrice !== item?.variant?.price) return item?.variant?.basePrice;
          return item?.variant?.price;
        };
        if (item?.variant?.basePrice) return item?.variant?.basePrice;
        const index = item?.variant?.alternativeVariant?.values?.indexOf(item?.alternativeVariant?.value);
        return index === 0
          ? item?.variant?.realPrice
          : item?.variant?.realPrice -
          item?.variant?.alternativeVariant?.base_extra;
      }
    ),
    cart_variant_alternative: newItems?.cart?.map(
      (item: any) => item?.variant?.alternativeVariant
    ),
    cart_size: newItems?.cart?.map((item: any) => item?.size),
    cart_variant: newItems?.cart?.map(
      (item: any) => item?.variant?.variants[0]
    ),
    cart_category: newItems?.cart?.map((item: any) =>
      JSON.stringify(item?.category)
    ),
    cart_id: newItems?.cart?.map((item: any) => item?.id),
    cart_sku: newItems?.cart?.map((item: any) => item?.sku),
    cart_letters: newItems?.cart?.map((item: any) => item?.letters),
    cart_letters_font: newItems?.cart?.map((item: any) => item?.lettersFont),
    cart_style: newItems?.cart?.map((item: any) => item?.style),
    cart_alternativeVariant: newItems?.cart?.map(
      (item: any) => item?.alternativeVariant
    ),
    cart_customOption: newItems?.cart?.map((item: any) => item?.customOption),
    cart_replica: newItems?.cart?.map((item: any) => item?.replica),
    cart_diamond: newItems?.cart?.map((item: any) => {
      return item?.diamond;
    }),
  };
};

export const getCartBackInformation = (response: any) => {
  const cartBack = response.cart.filter(
    (item: any) =>
      item.cart_status === "incomplete" || item.cart_status === "empty"
  );
  const items = cartBack[0]?.cart_contents_names.map((name: any, index: any) => {
    return {
      name: name,
      cart_thumbs_urls_1st: cartBack[0].cart_thumbs_urls_1st[index],
      url: cartBack[0].cart_contents_urls[index],
      variant: {
        alternativeVariant: cartBack[0].cart_variant_alternative
          ? cartBack[0].cart_variant_alternative[index]
          : {},
        images: [
          {
            name: cartBack[0].cart_thumbs_urls[index].name,
            alt: cartBack[0].cart_thumbs_urls[index].alt,
          },
        ],
        price: cartBack[0].cart_content_price[index],
        basePrice: cartBack[0].cart_content_base_price
          ? cartBack[0].cart_content_base_price[index]
          : cartBack[0].cart_content_price[index],
        urlPath: cartBack[0].cart_urlPath[index],
        variants: [
          {
            variant: cartBack[0].cart_variant[index].variant,
            value: cartBack[0].cart_variant[index].value,
          },
        ],
      },
      size: cartBack[0].cart_size[index],
      category: cartBack[0].cart_category[index]?.includes("{")
        ? JSON.parse(cartBack[0].cart_category[index])
        : {},
      id: cartBack[0].cart_id[index],
      sku: cartBack[0].cart_sku[index],
      replica: cartBack[0].cart_replica[index],
      ...(cartBack[0].cart_diamond[index] &&
        Object.values(cartBack[0].cart_diamond[index]).some(
          (value) => value !== ""
        ) && {
          diamond: cartBack[0].cart_diamond[index],
        }),
      letters: cartBack[0].cart_letters[index],
      lettersFont: cartBack[0].cart_letters_font[index],
      alternativeVariant: cartBack[0].cart_alternativeVariant[index],
      customOption: cartBack[0].cart_customOption[index],
      style: cartBack[0].cart_style[index] || "",
      soldOut: cartBack[0]?.cart_sold_out?.[index] || false,
      priceChanged: cartBack[0]?.cart_price_changed?.[index] || false,
      disabled: cartBack[0]?.cart_disabled?.[index] || false,
    };
  });
  return items;
};

export const filterReplicas = (items: any) => {
  const replicas = items.filter((item: any) => item?.replica);
  if (replicas.length > 1) {
    const lastReplica = replicas.pop();
    const newItems = items.filter((item: any) => !item?.replica);
    newItems.push(lastReplica);
    return newItems;
  }
  return items;
};

export const getPostStream = (req: IncomingMessage) => {
  return new Promise((resolve) => {
    let postBody = "";
    req.on("data", (data: any) => {
      postBody += data.toString();
    });
    req.on("end", () => {
      const body = postBody.includes("{")
        ? JSON.parse(postBody)
        : separateStringPost(postBody);
      resolve(postBody ? body : null);
    });
  });
};

const separateStringPost = (str: string) => {
  const values = str.split("&");
  const newJSON: any = {};
  for (const value of values) {
    const separate = value.split("=");
    newJSON[separate[0]] = separate[1];
  }
  return newJSON;
};

export const capitalizeWord = (word: string) => {
  if (word) {
    const firstLetter = word[0];
    if (word === "") {
      return "";
    }

    const upperCaseFirstLetter = firstLetter.toUpperCase();

    if (firstLetter === upperCaseFirstLetter) {
      return word;
    }
    return upperCaseFirstLetter + word.slice(1);
  }
  return "";
};

export const isToday = (date: Date) => {
  const currentDay = new Date()
  const lastDay = new Date(date)
  return (
    currentDay.getDate() === lastDay.getDate() &&
    currentDay.getMonth() === lastDay.getMonth() &&
    currentDay.getFullYear() === lastDay.getFullYear()
  )
}

export const diffTimesISOString = (time1: string, time2: string) => {

  const date1 = new Date(time1);
  const date2 = new Date(time2);

  // Calculate the difference in milliseconds
  const diff = Math.abs(date1.getTime() - date2.getTime());

  // Convert the difference to hours
  const diffHours = diff / (1000 * 60 * 60);

  return diffHours
}


export const formatName = (name: string) => {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}