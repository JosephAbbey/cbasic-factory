import React, { Component } from 'react';
import Link from 'next/link';
class Index extends Component {
    constructor(props: object) {
        super(props);
    }

    render() {
        return <Link href="/game">New World</Link>;
    }
}
export default Index;
