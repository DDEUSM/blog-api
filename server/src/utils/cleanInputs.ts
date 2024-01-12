export default function(dirtInput: any)
{
    const keys = Object.keys(dirtInput);
    const values = Object.values(dirtInput);

    const cleanOutput = values.reduce((output: any, value, index ) => {
        value? output[keys[index]] = value : null;
        return output;
    }, {});

    return cleanOutput;
}