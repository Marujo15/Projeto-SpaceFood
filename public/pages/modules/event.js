function event(path) {
    const event = new CustomEvent("customEvent", { detail: { path: path } });
    return event;
}

export default event;