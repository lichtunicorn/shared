export type networkInterfaces = {
    [interfaceName: string]: {
        address: string;
        netmask: string;
        isIPv4: boolean;
    }[];
}