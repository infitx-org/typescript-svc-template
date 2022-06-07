## Mocking a service for development / for integration and functional tests

We can use TTK to mock a dependent service (JSON RestAPI) to use with the developing service.

```mermaid
graph LR;
  TTK_CLI(TTK CLI)-.->TTK_FUNC(TTK Service);
    TTK_FUNC-..->NEW_SVC[New Service];
  subgraph Service
    NEW_SVC-->TTK_MOCK(Mock Service using TTK);
  end
  style TTK_CLI stroke-dasharray: 5 5
  style TTK_FUNC stroke-dasharray: 5 5
```

If a dependent service is still under development or too big to be run in the test harness, we can use TTK to mock that service. Please follow this documentation to create rules in TTK to get intended responses / callbacks from the mocked service.

In this case, its preferable to run two separate TTK services. One for mocking and one for functional tests.
