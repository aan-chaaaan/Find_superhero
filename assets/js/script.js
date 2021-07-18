$(document).ready(function () {
  const idSuperheroValue = $(`#idSuperhero`);
  const formElement = $(`#form`);

  console.log(formElement);

  formElement.submit(function (event) {
    event.preventDefault();

    const idSuperhero = idSuperheroValue.val();

    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://www.superheroapi.com/api.php/10224372835243702/${idSuperhero}`,
    })
      .done(function (data) {
        console.log(data);
        console.log(data.powerstats);

        $(`.card-title`).html(`<p>SuperHero encontrado</p>`);
        //imagen
        console.log(data.image.url);
        $(`#imageSuperhero`).attr("src", data.image.url);

        //conversion de objeto connections a string para poder obtener sus valores
        let realDataConnections = JSON.stringify(data.connections);
        //iteracion de caracteristicas de personaje
        $.each(data, function (i) {
          $(`.card-text`).append(
            `<p> Nombre: ${data.name}</p> 
          <p> Conexiones: ${realDataConnections} </p> 
          <p> Publicado por: ${data.biography.publisher} </p>
          <p> Altura: ${data.appearance.height} </p>
          <p> Peso: ${data.appearance.weight} </p>
          <p> Alianzas: ${data.biography.aliases} </p>`
          );
          $(`.firstAppearance`).html(
            `<p>Primera aparición: ${data.biography[`first-appearance`]} </p>`
          );
          if (i) {
            return false;
          }
        });
        const chart = new CanvasJS.Chart("chartSection", {
          title: {
            text: "Grafico SuperHero",
          },
          data: [
            {
              type: "pie",
              dataPoints: [
                {
                  label: "Intelligence",
                  y: Number.parseInt(data.powerstats.intelligence),
                },
                {
                  label: "strength",
                  y: Number.parseInt(data.powerstats.strength),
                  color: "lightblue",
                },
                { label: "Speed", y: Number.parseInt(data.powerstats.speed) },
                {
                  label: "Durability",
                  y: Number.parseInt(data.powerstats.durability),
                },
                { label: "Power", y: Number.parseInt(data.powerstats.power) },

                {
                  label: "Combat",
                  y: Number.parseInt(data.powerstats.combat),
                  color: "royalblue",
                },
              ],
            },
          ],
        });
        chart.render();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {
          alert("Not connect: Verify Network.");
        } else if (jqXHR.status == 404) {
          alert("Requested page not found [404]");
        } else if (jqXHR.status == 500) {
          alert("Internal Server Error [500].");
        } else if (textStatus === "parsererror") {
          alert("Requested JSON parse failed.");
        } else if (textStatus === "timeout") {
          alert("Time out error.");
        } else if (textStatus === "abort") {
          alert("Ajax request aborted.");
        } else {
          alert("Uncaught Error: " + jqXHR.responseText);
        }
      });
  });
});
