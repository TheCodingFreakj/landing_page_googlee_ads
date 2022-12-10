(function ($) {
  "use strict";
  $("#select").chosen();
  $("#select-2").chosen();
  $("#select-3").chosen();
  const renderPriceChart = document.querySelector("#calculateServicePrice");

  let price = 20000;
  let priceTotal = null;
  let sumtotal;
  let result;
  let array = [];
  let servicesData = [
    {
      id: 1,
      title: "Subtotal for Phase I: Strategy & Research",
      idxx: "phase",
      price: 40000,
      services: [
        {
          id: 1,
          title: "Web Design Services including development of site map",
          idxx: "development-1",
          price: 10000,
          inputId: "inputwebdesign",
        },
        {
          id: 2,
          title:
            "Web Development Including CSS conversion, responsive CMS integration",
          idxx: "development-2",
          price: 30000,
          inputId: "inputwebdev",
        },
      ],
    },

    {
      id: 2,
      title:
        "Subtotal for Phase II: Creative Exploration & Design Development ",
      idxx: "phase",
      price: 16140,

      services: [
        {
          id: 1,
          title:
            "Content Migration, min= 7 pages Up to 10 pages at ₹20 per page",
          idxx: "content",
          price: 140,
          inputId: "marketingg-1",
        },
        {
          id: 2,
          title: "SEO (on page optimization) and Social Media Integration",
          idxx: "seo",
          price: 1000,
          inputId: "marketingg-2",
        },
        {
          id: 3,
          title:
            "Production/Implementation, including Beta testing of website, resolve issues and launch website",
          idxx: "otherissue",
          price: 10000,
          inputId: "marketingg-3",
        },
        {
          id: 4,
          title:
            "Training & Testing Consultation,including preparation of training, testing & documentation materials",
          idxx: "docs",
          price: 5000,
          inputId: "marketingg-4",
        },
      ],
    },

    {
      id: 3,
      title: "Subtotal for Phase III: Production Management & Implementation",
      idxx: "phase",
      price: 10000,
    },
    { id: 4, title: "Total for Services", idxx: "total", priceTotal: 56140 },
  ];
  let services = [];

  services = servicesData
    .filter((e) => e.services !== undefined)
    .map(function (e) {
      return e.services;
    });
  // ${
  //   element.priceTotal ? element.priceTotal : result ? result : element.price
  // }
  const showInnercosts = (data) => {
    return `${
      data.services !== undefined &&
      data.services
        .map((services, inx) => {
          return `<div class="container text-start">
    <div class="row align-items-start">
    <div id="title" class="col-xl-4">
      ${services.title}
    </div>
    <div id="price" class="col-xl-2">
    <p id=${services.idxx}>${services.price} </p>
    </div>
    <div class="col-xl-2">
    <input type="text" name="text" placeholder="Adjust Price.." class="inputSwlector"id=${services.idxx}></p>
    <div id="result"></div>
    </div>
    </div>
    </div>`;
        })
        .join("")
    } `;
  };
  let contentss = "";

  let totalPrice = [];
  let totalPrices = new Array(servicesData.length);
  servicesData.forEach((element, indx) => {
    if (element.idxx === "phase") {
      totalPrice.push(element.price);
      sumtotal = totalPrice.reduce((accumulator, object) => {
        return accumulator + Number(object);
      }, 0);
    }

    result =
      element.services !== undefined &&
      element.services.reduce((accumulator, object) => {
        return accumulator + Number(object.price);
      }, 0);
    // console.log(sumtotal, result);

    contentss = `  
  
                <div id="serviceList" class="container text-start">
      <div class="row align-items-start">
        <div  class="col">
          <h4>${element.title}</h4>
        </div>
        <div  class="col">
          <p id=${servicesData[indx].id} >${
      element.idxx === "total" ? sumtotal : result ? result : element.price
    }</p>
        </div>
    
         </div> 
   
    
    ${element.hasOwnProperty("services") ? showInnercosts(element) : ""}

    
    <br/>
    </form>
    `;

    renderPriceChart.innerHTML += contentss;
  });

  $('input[name="text"]').on("input", function () {
    services !== undefined &&
      services.forEach((element) => {
        element.forEach((e, i) => {
          if (`${e.idxx}` == $(this).attr("id")) {
            document.getElementById(`${e.idxx}`).innerHTML = $(this).val();
            e.price = $(this).val();

            result =
              element !== undefined &&
              element.reduce((accumulator, object) => {
                return accumulator + Number(object.price);
              }, 0);
          }
        });

        servicesData.forEach((element) => {
          if (
            element.services !== undefined &&
            JSON.stringify(element.services).indexOf($(this).attr("id")) > -1
          ) {
            element.price = result;
            document.getElementById(`${element.id}`).innerHTML = result;
          }

          $("#calculateservice").on("click", function () {
            totalPrices.push(element.price);
            let price = [...new Set(totalPrices)].filter(
              (data) => data !== undefined
            );
            console.log(price);
            sumtotal = price.reduce((accumulator, object) => {
              return accumulator + Number(object);
            }, 0);

            document.getElementById(
              `${servicesData[servicesData.length - 1].id}`
            ).innerHTML = sumtotal;

            document.getElementById(
              "header"
            ).innerHTML = `Basic Package - ${sumtotal} `;
          });
        });
      });
  });

  // *********************************************************send quote with adjusted price *******************************************//

  $("#costcalculator").on("submit", function (e) {
    e.preventDefault(); //prevent default form submition
    var orderItems2 = [];
    $.each($("#select-2 option:selected"), function () {
      let valueProp = $(this).val().trim();
      let Prop = $(this).text().trim();
      orderItems2.push({ [Prop]: valueProp });
    });

    var orderItems3 = [];
    $.each($("#select-3 option:selected"), function () {
      let valueProp = $(this).val().trim();
      let Prop = $(this).text().trim();
      orderItems3.push({ [Prop]: valueProp });
    });
    var orderItems = [];
    $.each($("#select option:selected"), function () {
      let valueProp = $(this).val().trim();
      let Prop = $(this).text().trim();
      orderItems.push({ [Prop]: valueProp });
    });
    let mainExtraItems = [...orderItems, ...orderItems2, ...orderItems3];
    mainExtraItems = mainExtraItems.filter(
      (val) => !val.hasOwnProperty("Select")
    );
    console.log(mainExtraItems);

    console.log(JSON.parse(localStorage.getItem("calculateServicePrice")));

    return false;
  });
  $("#calculateServicePrice").on("submit", function (e) {
    e.preventDefault();

    const titleChart = document.querySelectorAll("#title");
    const priceChart = document.querySelectorAll("#price");
    // console.log(priceChart, titleChart);
    let price = [];
    let title = [];

    titleChart.forEach((key, i) => {
      //title.push(key.innerText);
      title.push(key.innerText.split(" ").join("_"));
    });

    priceChart.forEach((key, i) => {
      price.push(key.innerText);
    });

    var result = {};
    title.forEach((key, i) => (result[key] = price[i]));
    if (JSON.stringify(array).indexOf(Object.keys(result)) === -1) {
      array.push(result);
    }
    console.log(array[0]);

    localStorage.setItem("calculateServicePrice", JSON.stringify(array[0]));
    return false;
  });

  // *********************************************************Select *******************************************//

  const select = document.querySelector("#select");
  const select2 = document.querySelector("#select-2");
  const select3 = document.querySelector("#select-3");
  select.onchange = () => {
    const selectedValues = [].filter
      .call(select.options, (option) => option.selected)
      .map((option) => {
        return {
          service: option.text,
          price: option.value,
        };
      });
    let extras = selectedValues.filter((val) => val.service !== "Select");
    extras = extras.filter((val) => val.service !== "Select");

    const sumextras = extras.reduce((accumulator, object) => {
      return accumulator + Number(object.price);
    }, 0);

    if (sumextras !== 0) {
      document.querySelector(".eachSum-1").style.display = "inline-block";
      document.querySelector("#total-1").innerHTML = sumextras;
    }
  };

  select2.onchange = () => {
    const selectedValues2 = [].filter
      .call(select2.options, (option) => option.selected)
      .map((option) => {
        return {
          service: option.text,
          price: option.value,
        };
      });
    let promos = selectedValues2.filter((val) => val.service !== "Select");
    promos = promos.filter((val) => val.service !== "Select");

    const sumpromos = promos.reduce((accumulator, object) => {
      return accumulator + Number(object.price);
    }, 0);

    if (sumpromos !== 0) {
      document.querySelector(".eachSum-2").style.display = "inline-block";
      document.querySelector("#total-2").innerHTML = sumpromos;
    }
  };

  select3.onchange = () => {
    const selectedValues3 = [].filter
      .call(select3.options, (option) => option.selected)
      .map((option) => {
        return {
          service: option.text,
          price: option.value,
        };
      });
    let misc = selectedValues3.filter((val) => val.service !== "Select");
    misc = misc.filter((val) => val.service !== "Select");

    const summisc = misc.reduce((accumulator, object) => {
      return accumulator + Number(object.price);
    }, 0);

    if (summisc !== 0) {
      document.querySelector(".eachSum-3").style.display = "inline-block";
      document.querySelector("#total-3").innerHTML = summisc;
    }
  };

  const btn = document.querySelector("#calculate");
  //   $(window).scrollTop(0);
  btn.onclick = (e) => {
    e.preventDefault();

    const selectedValues = [].filter
      .call(select.options, (option) => option.selected)
      .map((option) => {
        return {
          label: option.text,
          value: Number(option.value),
        };
      });

    const selectedValues2 = [].filter
      .call(select2.options, (option) => option.selected)
      .map((option) => {
        return {
          label: option.text,
          value: Number(option.value),
        };
      });

    const selectedValues3 = [].filter
      .call(select3.options, (option) => option.selected)
      .map((option) => {
        return {
          label: option.text,
          value: Number(option.value),
        };
      });

    console.log(selectedValues3);

    let allselected = [
      ...selectedValues,
      ...selectedValues3,
      ...selectedValues2,
    ];

    allselected = allselected.filter((val) => val.label !== "Select");

    console.log(allselected);

    localStorage.setItem(
      "calculateextraServicePrice",
      JSON.stringify(allselected)
    );

    const sum = allselected.reduce((accumulator, object) => {
      return accumulator + Number(object.value);
    }, 0);
    console.log(sum);

    if (sum !== 0) {
      document.querySelector(".tip").style.display = "flex";
      document.querySelector(".tip").style.justifyContent = "center";
      document.querySelector(".tip").style.flexDirection = "column";
      document.querySelector(
        "#total"
      ).innerHTML = `Extra Services Estimate : ${sum} INR`;
      document.querySelector("#total-package").innerHTML = `Total Estimate : ${
        sum + sumtotal
      } INR`;
    }
    return false;
  };
  $("#sendQuote").on("click", function (e) {
    e.preventDefault();

    var email = document.getElementById("exampleInputEmail11").value;

    let extras = JSON.parse(localStorage.getItem("calculateextraServicePrice"));
    let services = JSON.parse(localStorage.getItem("calculateServicePrice"));

    // const buildObject = (arr) => {
    //   const obj = {};
    //   for (let i = 0; i < arr.length; i++) {
    //     const { service, price } = arr[i];
    //     let formattedservice = service.split(" ").join("_");
    //     obj[formattedservice] = price;
    //   }

    //   return obj;
    // };

    var result = Object.keys(services).map((key) => {
      return {
        label: key,
        value: Number(services[key]),
      };
    });

    console.log(result);

    // const  arraySecodary = {...services, ...buildObject(extras)};
    const arraySecodary = [...result, ...extras];

    const data = {
      email,
      arraySecodary,
    };

    console.log(data);

    $.ajax({
      url: "https://www.pallavipriya.online/serviceDetails",
      //url: "http://localhost:9099/serviceDetails",
      type: "POST",
      data: data,
      success: function (data) {
        console.log(data);
        // $("#sendmessage").removeClass("hideSuccessMessage");
        // $("#sendmessage").addClass("showSuccessMessage");
        // $("#sendmessage").text(`${data.message}`);
      },
      error: function (err) {
        // console.log(err);
        // $("#errormessage").removeClass("hideErrorMessage");
        // $("#errormessage").addClass("showErrorMessage");
        // $("#errormessage").text(err.responseJSON.message);
      },
    });
    return false;
  });
  // *********************************************************1st Form *******************************************//
  $("#my-form").on("submit", function (e) {
    e.preventDefault(); //prevent default form submition

    var email = $("#my-form").find('input[name="email"]').val().trim();
    var name = $("#my-form").find('input[name="name"]').val().trim();
    var phone = $("#my-form").find('input[name="phone"]').val().trim();
    var message = $("#my-form").find('textarea[name="message"]').val().trim();

    var FormData = {
      email,
      name,
      phone,
      message,
    };

    console.log(FormData);

    $.ajax({
      url: "https://www.pallavipriya.online/add-contact",
      //url: "http://localhost:9099/api/add-contact",
      type: "POST",
      data: FormData,
      success: function (data) {
        console.log(data);
        $("#sendmessage").removeClass("hideSuccessMessage");
        $("#sendmessage").addClass("showSuccessMessage");
        $("#sendmessage").text(`${data.message}`);
      },
      error: function (err) {
        // console.log(err);
        // $("#errormessage").removeClass("hideErrorMessage");
        // $("#errormessage").addClass("showErrorMessage");
        // $("#errormessage").text(err.responseJSON.message);
      },
    });

    return false;
  });
})(jQuery);
