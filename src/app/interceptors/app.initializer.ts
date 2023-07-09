
export function appInitializer() {
    return () => {
        new Promise((resolve) => {
            //@ts-ignore
            resolve();
        })
    }
}