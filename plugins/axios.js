export default function ({ $axios, redirect }) {
  // on API call error, redirect to error page with different parameters per case
  $axios.onError((error) => {
    if (error.response === undefined) {
      redirect("/error?q=undefined");
    } else if (error.response.status === 400) {
      redirect("/error?q=400");
    } else {
      redirect("/error");
    }
  });
}
