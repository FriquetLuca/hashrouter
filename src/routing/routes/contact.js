export default function Contact(params) {
    return {
        route: "/contact",
        content: `<h1>Contact page of ${params.get('name') || "Unknown user"}</h1>`
    };
}