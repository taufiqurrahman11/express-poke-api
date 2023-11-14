export const fibonacci = (n) => {
    if (n <= 0) return 0;
    let a = 0, b = 1;

    for (let i = 2; i <= n; i++) {
        const temp = b;
        b = a + b;
        a = temp;
    }
    return b;
}