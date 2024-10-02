const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: null,
      contacts: [],
    },
    actions: {
      getOrCreateUser: async (slug) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${slug}`
          );
          if (response.ok) {
            let data = await response.json();
            setStore({ contacts: data.contacts });
          } else if (response.status == 404) {
            setStore({ contacts: [] });
            const createAgenda = await fetch(
              `https://playground.4geeks.com/contact/agendas/${slug}`,
              {
                method: "POST",
              }
            );
            let userdata = await createAgenda.json();
            setStore({ user: userdata.slug.toLowerCase() });
          } else {
            throw Error(
              `Error: Status:${response.status}, StatusText: ${response.statusText}`
            );
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      setUser: (username) => {
        if (username != "") {
          setStore({ user: username.toLowerCase() });
          return;
        }
        alert("No puedes ingresar un usuario en blanco");
      },
      addNewContact: async (data, slug) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${slug}/contacts`,
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            console.log("Contacto Creado");
          } else {
            throw Error(`Error: ${response.status} -/- ${response.statusText}`);
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      deleteContact: async (contactId) => {
        try {
          const store = getStore();
          const actions = getActions();
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${store.user}/contacts/${contactId}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            console.log("Contacto Eliminado con exito");
            actions.getOrCreateUser(store.user);
            setTimeout(() => {
              console.log("Agenda actualizada");
            }, 1000);
          } else {
            throw Error(`Error: ${response.status} -/- ${response.statusText}`);
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      editContact: async (contactId, payload) => {
        const store = getStore()
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${store.user}/contacts/${contactId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );
          if (response.ok) {
            console.log("Usuario modificado");
          }else{
            throw Error(`Error: ${response.status}, ${response.statusText}`)
          }
        } catch (error) {
          console.log(error)
          throw error
        }
      },
    },
    
  };
};

export default getState;
