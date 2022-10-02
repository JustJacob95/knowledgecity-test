<?php

namespace Core\Model;


class Collection
{
    protected $items = [];

    function __construct($items)
    {
        $this->items = $items;
    }

    public function getItems()
    {
        return $this->items;
    }

    public function count()
    {
        return count($this->items);
    }

    public function toArray()
    {
        $items = [];
        foreach ($this->items as $item)
        {
            $items[] = $item->getAttributes();
        }
        return $items;
    }

    //todo as a collection we can create another usefull methods
}